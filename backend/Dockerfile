FROM golang:1.19-alpine

WORKDIR /go/src/github.com/sut/66/team12
COPY backend .
RUN apk add build-base
RUN go mod tidy
RUN go build -o main .
EXPOSE 8080
CMD ["./main"]