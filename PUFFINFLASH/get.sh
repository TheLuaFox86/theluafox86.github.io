#!/usr/bin/env bash
# get.sh - download a .swf and add it to list.js pointing to archive/<filename>
set -euo pipefail

LIST_FILE="list.js"
ARCHIVE_DIR="archive"

read -rp "Enter URL to .swf file: " URL
if [[ -z "$URL" ]]; then
    echo "No URL provided." >&2
    exit 1
fi

if ! grep -qi "\.swf" <<< "$URL"; then
    echo "Warning: URL does not appear to point to a .swf file." >&2
fi

# Extract filename (strip query string)
RAWNAME="$(basename "${URL%%\?*}")"
# URL-decode filename
DECODED_NAME="$(python3 -c "import sys,urllib.parse as u; print(u.unquote(sys.argv[1]))" "$RAWNAME")"
# Fallback if decoding produced nothing
if [[ -z "$DECODED_NAME" ]]; then DECODED_NAME="$RAWNAME"; fi

# Ensure extension
if [[ "$DECODED_NAME" != *.* ]]; then
    DECODED_NAME="${DECODED_NAME}.swf"
fi

NAME_NO_EXT="${DECODED_NAME%.*}"

mkdir -p "$ARCHIVE_DIR"
TARGET_PATH="$ARCHIVE_DIR/$DECODED_NAME"

# If file exists, avoid overwrite by appending a timestamp
if [[ -e "$TARGET_PATH" ]]; then
    ts=$(date +%s)
    TARGET_PATH="${ARCHIVE_DIR}/${NAME_NO_EXT}-${ts}.${DECODED_NAME##*.}"
fi

# Download with wget to temporary file then move into place
TMP="$(mktemp --tmpdir "$(basename "$DECODED_NAME").XXXX")"
trap 'rm -f "$TMP"' EXIT
echo "Downloading..."
if ! wget -q --show-progress -O "$TMP" "$URL"; then
    echo "Download failed." >&2
    exit 2
fi
mv "$TMP" "$TARGET_PATH"
trap - EXIT
echo "Saved to $TARGET_PATH"

# Prepare list entry
REL_PATH="$TARGET_PATH"
ENTRY="$(printf '  {\n    name: \"%s\",\n    url: \"%s\"\n  },\n' "$NAME_NO_EXT" "$REL_PATH")"

# Ensure list file exists and has a JS array to insert into
if [[ ! -f "$LIST_FILE" ]]; then
    cat > "$LIST_FILE" <<EOF
EOF
fi

# Find the last line that is a closing bracket of the array (a line containing ] optionally followed by ;)
POS_LINE=$(grep -n -E '^\s*\]\s*;?\s*$' "$LIST_FILE" | tail -n1 | cut -d: -f1 || true)

if [[ -n "$POS_LINE" ]]; then
    # Insert entry before that line
    awk -v n="$POS_LINE" -v entry="$ENTRY" 'NR==n{printf "%s", entry} {print}' "$LIST_FILE" > "$LIST_FILE.tmp" && mv "$LIST_FILE.tmp" "$LIST_FILE"
else
    # No closing bracket found: append entry and close the array
    # Try to append inside an existing array start, otherwise create a new array
    if grep -q -E '^\s*var\s+[a-zA-Z0-9_]+\s*=\s*\[' "$LIST_FILE"; then
        printf "%s\n" "$ENTRY" >> "$LIST_FILE"
        printf "] ;\n" >> "$LIST_FILE"
    else
        # create a new list assignment
        cat >> "$LIST_FILE" <<EOF
$ENTRY];
EOF
    fi
fi

echo "Added entry to $LIST_FILE"