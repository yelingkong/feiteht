import actions from '../actions'

export function login (params) {
  return actions({
    url: '/user/login',
    methods: 'POST',
    params
  })
}