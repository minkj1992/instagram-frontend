#!/bin/sh
# use: $ push.sh -c TEST -m "커밋할 메시지, 띄워쓰기 하기 위해서 use Double quotes"
CURRENT_CATEGORY='CRA'
COMMIT_MSG="$(date)"

## 도움말 출력하는 함수
help() {
    echo "splt [OPTIONS] FILE"
    echo "    -h         도움말 출력."
    echo "    -c ARG     카테고리를 지정하는 옵션"
    echo "    -m ARG     커밋 메시지를 받는 옵션"
    exit 0
}

# If a command fails then the deploy stops
set -e

while getopts "c:m:h" opt
do
    case $opt in
        c) CURRENT_CATEGORY=$OPTARG
          echo "Current Category is: $CURRENT_CATEGORY"
          ;;
        m) COMMIT_MSG=$OPTARG
          echo "Current Commit Msg: $COMMIT_MSG"
          ;;
        h) help ;;
        ?) help ;;
    esac
done

printf "\033[0;32mPush to forked repo and origin repo to GitHub...\033[0m\n"

# git pull origin main
# git add .
# git commit -m "[$CURRENT_CATEGORY] $msg"
# git push origin main
