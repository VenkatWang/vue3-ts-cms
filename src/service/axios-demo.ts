import axios from 'axios'

axios.get('http://123.207.32.32:8000/home/multidata').then((result) => {
  console.log(result)
})

axios
  .get('http://httpbin.org/get', { params: { name: 'venkat' } })
  .then((result) => {
    console.log(result.data)
  })

axios
  .post('http://httpbin.org/post', { data: { name: 'venkat' } })
  .then((result) => {
    console.log(result.data)
  })

// new Promise<string>((resolve) => {
//   resolve('1213')
// }).then((res) => {
//   console.log(res)
// })
