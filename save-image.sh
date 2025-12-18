set -e

docker save --output="./images/$1.tar" $1
