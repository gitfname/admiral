import axios, { AxiosRequestConfig } from 'axios'
import { DataProvider } from '../admiral'

/**
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getCreateFormData      => GET http://my.api.url/posts/create
 * create      => POST http://my.api.url/posts
 * getUpdateFormData      => GET http://my.api.url/posts/123/update
 * update      => POST http://my.api.url/posts/123
 * delete      => DELETE http://my.api.url/posts/123
 *
 */
function _get(url: string) {
    return (query: AxiosRequestConfig = {}) => {
        const { cancelToken = axios.CancelToken.source().token, params = {} } = query

        return axios
            .get(url, {
                cancelToken,
                params: params,
            })
            .then((response) => response.data)
    }
}

function _delete(url: string) {
    return (query: AxiosRequestConfig = {}) => {
        const { data } = query

        return axios.delete(url, data).then((response) => response.data)
    }
}

function _post(url: string) {
    return (query: AxiosRequestConfig = {}) => {
        const { cancelToken = axios.CancelToken.source().token, data } = query

        return axios
            .post(url, data, {
                cancelToken,
            })
            .then((response) => response.data)
    }
}

export default (apiUrl: string): DataProvider => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 }

        const query = {
            page,
            perPage,
            sort: params.sort,
            filter: params.filter,
        }

        const url = `${apiUrl}/${resource}`
        return _get(url)({ params: query })
    },

    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _get(url)({ params })
    },

    getCreateFormData: (resource) => {
        const url = `${apiUrl}/${resource}/create`
        return _get(url)({})
    },

    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`
        return _post(url)({ data: params.data })
    },

    getUpdateFormData: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}/update`
        return _get(url)({ params })
    },

    update: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _post(url)({ data: params.data })
    },

    deleteOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _delete(url)()
    },
})
