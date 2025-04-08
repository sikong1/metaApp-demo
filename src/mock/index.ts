const Mock = require("mockjs")

// 1. 定义生成函数
function generateMockData(params: { page: number; limit: number }) {
  const { page, limit } = params
  return Mock.mock({
    // 属性 list 的值是一个数组，随机生成 1 到 10 个元素
    [`list|${limit}`]: [
      {
        id: "@id",
        // title 中文·1
        title: "@ctitle(5, 10)",
        isImg: "@boolean",
        img: "@image('200x100', '#50B347', '#FFF', 'Mock.js')",
        video: "https://www.w3schools.com/html/movie.mp4",
        author: {
          name: "@cname",
          avatar: "@image('200x100', '#50B347', '#FFF', 'Mock.js')"
        },
        like: "@integer(0, 100)",
        typeName: "@cword(2, 4)"
      }
    ],
    page,
    limit,
    code: 200,
    message: "ok"
  })
}

export default generateMockData
