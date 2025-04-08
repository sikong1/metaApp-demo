<template>
  <scroll-view
    class="container"
    scroll-y
    refresher-enabled
    :refresher-triggered="isRefreshing"
    @refresherrefresh="onRefresh"
    @scrolltolower="loadMore"
  >
    <!-- 瀑布流两列容器 -->
    <view class="waterfall">
      <!-- 左列 -->
      <view class="column">
        <item-block
          v-for="item in leftList"
          :key="item.id"
          :item="item"
          :observer="observer"
        />
      </view>
      <!-- 右列 -->
      <view class="column">
        <item-block
          v-for="item in rightList"
          :key="item.id"
          :item="item"
          :observer="observer"
        />
      </view>
    </view>
  </scroll-view>
</template>

<script>
import ItemBlock from "./components/ItemBlock.vue"
import generateMockData from "../../mock/index.ts"

export default {
  components: { ItemBlock },
  data() {
    return {
      list: [],
      page: 1,
      limit: 10,
      isRefreshing: false,
      observer: null,
      isMore: false
    }
  },
  computed: {
    // 分割为左右两列
    leftList() {
      return this.list.filter((_, index) => index % 2 === 0)
    },
    rightList() {
      return this.list.filter((_, index) => index % 2 === 1)
    }
  },
  async mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target
        // 获取el的id
        const video = el.querySelector("video")
        if (entry.isIntersecting) {
          video.play()
        } else {
          video.pause()
        }
      })
    })
    await this.loadData()
  },
  methods: {
    async loadData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 模拟API请求
          const newData = generateMockData({
            page: this.page,
            limit: this.limit
          })

          if (this.page === 1) {
            this.list = newData.list
            // document.querySelectorAll(".video").forEach((video) => {
            //   this.observer.observe(video)
            // })
          } else {
            this.list = [...this.list, ...newData.list]
          }
          // this.$nextTick(() => {
          // })
          resolve()
        }, 2000)
      })
    },

    async onReachBottom() {
      this.page++
      await this.loadData()
    },

    async onRefresh() {
      this.isRefreshing = true
      this.page = 1
      this.list = []
      console.log("hhhh")
      await this.loadData()
      this.isRefreshing = false
    },

    async loadMore() {
      if (this.isMore) return
      this.isMore = true
      this.page++
      await this.loadData()
      this.isMore = false
    }
  },
  beforeUnmount() {
    this.observer?.disconnect()
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  box-sizing: border-box;
}

.waterfall {
  display: flex;
  padding: 10px;
  gap: 10px;
}

.sekeleton {
  width: 190px;
  height: 190px;
  white-space: pre !important;

  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  animation: loading 1.4s ease-in-out infinite;
  background-size: 400% 100% !important;
}

@keyframes loading {
  0% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
