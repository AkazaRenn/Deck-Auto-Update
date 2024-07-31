FROM docker.io/namely/protoc-all:latest

# <PLUGIN>/backend -> /backend
# <PLUGIN> -> /plugin
CMD ["-l", "node", "-d", "/plugin/deps/protobuf/source/steam", "-o", "/plugin/deps/protobuf/out", "--with-typescript"]
