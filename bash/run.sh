#!/bin/bash
for file in ` ls  *.nc `
    do
        if [ -d   $file ]
        then
             echo ""
        else
        	echo   $file
             python check.py "$file"
              echo "----------------------------------------"
        fi
done
