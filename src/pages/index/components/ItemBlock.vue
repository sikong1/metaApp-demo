<template>
  <view class="item">
    <!-- 内容区域 -->
    <view class="content">
      <!-- 视频 -->
      <view v-if="!item.isImg" class="video-wrapper">
        <video
          :id="`video-${item.id}`"
          :src="item.video"
          :controls="false"
          :muted="muted"
          class="video-element"
          @play="handlePlay"
          @pause="handlePause"
        />
      </view>
      <!-- 图片 -->
      <image v-else-if="item.img" :src="item.img" mode="widthFix" />
    </view>

    <!-- 底部信息 -->
    <view class="footer">
      <text>{{ item.title }}</text>
    </view>
    <view class="typeName">
      <text>{{ item.typeName }}</text>
    </view>

    <!-- 作者信息 -->
    <view class="author">
      <view class="name">
        <image class="avatar" :src="item.author.avatar" />
        <text>{{ item.author.name }}</text>
      </view>
      <view class="like">
        <text>{{ item.like }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    observer: { type: IntersectionObserver, required: true },
    muted: {
      type: Boolean,
      default: true // iOS 需要静音才能自动播放
    }
  },
  data() {
    return {
      videoContext: null
    }
  },
  mounted() {
    const el = document.getElementById(`video-${this.item.id}`)
    el && this.observer.observe(el)

    this.initVideo()
  },
  methods: {
    initVideo() {
      this.videoContext = uni.createVideoContext(`video-${this.item.id}`, this)
    },

    async playVideo() {
      try {
        // iOS 需要用户交互后才能播放声音
        await this.videoContext?.play()
        if (!this.muted) {
          this.videoContext?.sendDanmaku({ text: "开始播放" })
        }
      } catch (error) {
        console.error("视频播放失败:", error)
        // 自动播放失败时显示封面图
        this.$emit("play-failed", this.item.id)
      }
    },

    handlePlay() {
      this.$emit("play", this.item.id)
    },

    handlePause() {
      this.$emit("pause", this.item.id)
    }
  }
}
</script>

<style scoped>
.item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.author {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.name {
  display: flex;
  align-items: center;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.video-box {
  width: 100%;
  height: 300px;
}

.content image {
  width: 100%;
}

.footer {
  padding: 8px;
  display: flex;
  justify-content: space-between;
}

.typeName {
  padding: 0 8px;
  color: #858484;
  font-size: 12px;
}


.like {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #858484;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 177.78%; /* 16:9 比例 */
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
