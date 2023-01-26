# justeat

[![github/actions/workflow/status](https://img.shields.io/github/actions/workflow/status/brtmvdl/justeat/docker-push.yml)](https://img.shields.io/github/actions/workflow/status/brtmvdl/justeat/docker-push.yml) [![github/license](https://img.shields.io/github/license/brtmvdl/justeat)](https://img.shields.io/github/license/brtmvdl/justeat) [![github/stars](https://img.shields.io/github/stars/brtmvdl/justeat?style=social)](https://img.shields.io/github/stars/brtmvdl/antify?style=social)

App to manage tasks.

## Stack

[Docker](https://www.docker.com/)

[Node.js](https://nodejs.org/en/)

## How to

### Production

```sh
docker run -d -p 80:80 tmvdl/projects:justeat
```

### Development

```sh
bash env/pull.sh 

bash env/install.sh 

bash env/up.sh 
```

## License

[MIT](./LICENSE)
