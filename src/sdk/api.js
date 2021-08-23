const BASE_URLS = {
  production: '',
  development: 'http://localhost:5000'
}

const BASE_URL = process.env.NODE_ENV === 'development'? BASE_URLS.development : BASE_URLS.production;

const PATH = {
    getRecentPhotos: '/v1/api/photos?extras={{extras}}&perPage={{perPage}}&page={{page}}',
    searchPhotos: '/v1/api/photos/search?extras={{extras}}&perPage={{perPage}}&page={{page}}&searchQuery={{searchQuery}}'

}

export {
  BASE_URL,
  PATH
}