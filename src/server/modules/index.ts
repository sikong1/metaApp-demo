type dataType = {
    id: number; // id
    title: string; // 名字
    img?: string; // 图片
    video?: string;  // 视频
    // 作者
    author: {
        name: string; // 作者名字
        avatar: string; // 作者头像
    }
    // 点赞
    like: number;
    // 类型
    typeName: string;
}

type pageType = {
  page: number
  limit: number
}