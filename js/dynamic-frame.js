// 定義網格大小和單元格大小
const GRID_SIZE = 12;
const CELL_SIZE = 60; // pixels per grid cell

// 9部影片
const initialFrames = [
  {
    id: 1,
    video: "https://youtu.be/NypGnVNjuCI",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "./images/1_corner.png",
    edgeHorizontal: "./images/1_edge_h.png",
    edgeVertical: "./images/1_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    isHovered: false,
    url: "newpage1", // 點擊後要開啟的新頁面
  },
  {
    id: 2,
    video: "https://youtu.be/pfoBJNtUp8E",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "./images/2_corner.png",
    edgeHorizontal: "./images/2_edge_h.png",
    edgeVertical: "./images/2_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    url: "newpage2", // 點擊後要開啟的新頁面
  },
  {
    id: 3,
    video: "https://youtu.be/TT6ZaMAwwkw",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "./images/3_corner.png",
    edgeHorizontal: "./images/3_edge_h.png",
    edgeVertical: "./images/3_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    url: "newpage3", // 點擊後要開啟的新頁面
  },
  {
    id: 4,
    video: "https://youtu.be/ryCANZHtO4Y",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "./images/4_corner.png",
    edgeHorizontal: "./images/4_edge_h.png",
    edgeVertical: "./images/4_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    url: "newpage4", // 點擊後要開啟的新頁面
  },
  {
    id: 5,
    video: "https://youtu.be/vOxPTRxTUDs",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "./images/5_corner.png",
    edgeHorizontal: "./images/5_edge_h.png",
    edgeVertical: "./images/5_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    url: "newpage5", // 點擊後要開啟的新頁面
  },
  {
    id: 6,
    video: "https://youtu.be/yQSta563oZM",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "./images/6_corner.png",
    edgeHorizontal: "./images/6_edge_h.png",
    edgeVertical: "./images/6_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    url: "newpage6", // 點擊後要開啟的新頁面
  },
  {
    id: 7,
    video: "https://youtu.be/7mc_FYVJmzE",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "./images/7_corner.png",
    edgeHorizontal: "./images/7_edge_h.png",
    edgeVertical: "./images/7_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    url: "newpage7"
  },
  {
    id: 8,
    video: "https://youtu.be/F0WFKodpBP0",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "./images/8_corner.png",
    edgeHorizontal: "./images/8_edge_h.png",
    edgeVertical: "./images/8_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    url: "newpage8", // 點擊後要開啟的新頁面
  },
  {
    id: 9,
    video: ".https://youtu.be/6friTerMGJo",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "./images/9_corner.png",
    edgeHorizontal: "./images/9_edge_h.png",
    edgeVertical: "./images/9_edge_v.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 30,
    autoplayMode: "all",
    url: "newpage9", // 點擊後要開啟的新頁面
  }
];

class DynamicFrameLayout {
  constructor() {
    this.frames = [...initialFrames];
    this.hovered = null;
    this.hoverSize = 6;
    this.gapSize = 8;
    this.autoplayMode = "all";
    
    this.init();
  }

  init() {
    // 創建框架網格
    this.createFrameGrid();
    // 添加事件監聽器
    this.addEventListeners();
    
    // 初始化 YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // 當 API 準備好時初始化所有播放器
    window.onYouTubeIframeAPIReady = () => {
      document.querySelectorAll('[data-youtube-iframe]').forEach(frame => {
        const iframeId = frame.dataset.youtubeIframe;
        new YT.Player(iframeId, {
          events: {
            'onReady': (event) => {
              event.target.playVideo();
              event.target.mute();
            }
          }
        });
      });
    };
  }

  createFrameGrid() {
    const grid = document.createElement('div');
    grid.className = 'frame-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gridTemplateRows = 'repeat(3, 1fr)';
    grid.style.gap = `${this.gapSize}px`;
    grid.style.width = '100%';
    grid.style.height = '100%';

    this.frames.forEach(frame => {
      const frameElement = this.createFrameElement(frame);
      grid.appendChild(frameElement);
    });

    document.getElementById('dynamic-frame').appendChild(grid);
  }

  createFrameElement(frame) {
    const frameElement = document.createElement('div');
    frameElement.className = 'frame';
    frameElement.dataset.frameId = frame.id;
    
    // 特殊處理第9格，允許圖片和影片
    if (frame.id === 9) {
      const isYouTube = frame.video.includes('youtu');
      const isImage = /\.(gif|jpe?g|png|webp|bmp)$/i.test(frame.video);
      
      if (isYouTube) {
        const iframe = document.createElement('iframe');
        const videoId = this.extractYouTubeId(frame.video);
        
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = 'none';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        frameElement.appendChild(iframe);
        frameElement.dataset.youtubeIframe = videoId;
      } else if (isImage) {
        const img = document.createElement('img');
        img.src = frame.video;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        frameElement.appendChild(img);
      }
      return frameElement;
    }
    
    // 其他格子的原有邏輯
    const isYouTube = frame.video.includes('youtu');
    const isImage = /\.(gif|jpe?g|png|webp|bmp)$/i.test(frame.video);
    
    if (isYouTube) {
      const iframe = document.createElement('iframe');
      // 從 URL 提取 video ID，修正提取邏輯
      const videoId = this.extractYouTubeId(frame.video);
      
      // 第一個影片使用特定時間範圍
      const timeParams = videoId === 'vOxPTRxTUDs' ? '&start=28&end=58' : '';
      
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0${timeParams}`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      frameElement.appendChild(iframe);
      
      // 儲存 iframe 參考以便後續控制
      frameElement.dataset.youtubeIframe = videoId;
    } else if (isImage) {
      const img = document.createElement('img');
      img.src = frame.video;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain'; // 改為 contain 以保持圖片比例
      frameElement.appendChild(img);
    } else {
      const video = document.createElement('video');
      video.src = frame.video;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      frameElement.appendChild(video);
    }
    
    return frameElement;
  }

  addEventListeners() {
    // 框架懸停事件
    document.querySelectorAll('.frame').forEach(frame => {
      frame.addEventListener('mouseenter', () => this.handleFrameHover(frame));
      frame.addEventListener('mouseleave', () => this.handleFrameLeave(frame));
      
      // 添加點擊事件處理
      frame.addEventListener('click', () => {
        const frameId = parseInt(frame.dataset.frameId);
        const frameData = this.frames.find(f => f.id === frameId);
        if (frameData && frameData.url) {
          window.location.href = frameData.url;
        }
      });
    });
  }

  handleFrameHover(frame) {
    const frameId = parseInt(frame.dataset.frameId);
    const frameData = this.frames.find(f => f.id === frameId);
    if (frameData) {
      frameData.isHovered = true;
      this.updateLayout();
    }
  }

  handleFrameLeave(frame) {
    const frameId = parseInt(frame.dataset.frameId);
    const frameData = this.frames.find(f => f.id === frameId);
    if (frameData) {
      frameData.isHovered = false;
      this.updateLayout();
    }
  }

  updateLayout() {
    // 更新網格佈局
    const grid = document.querySelector('.frame-grid');
    const hoveredFrame = this.frames.find(f => f.isHovered);
    
    if (hoveredFrame) {
      const row = Math.floor(hoveredFrame.defaultPos.y / 4);
      const col = Math.floor(hoveredFrame.defaultPos.x / 4);
      
      const nonHoveredSize = (12 - this.hoverSize) / 2;
      const rowSizes = [0, 1, 2].map(r => r === row ? `${this.hoverSize}fr` : `${nonHoveredSize}fr`).join(' ');
      const colSizes = [0, 1, 2].map(c => c === col ? `${this.hoverSize}fr` : `${nonHoveredSize}fr`).join(' ');
      
      grid.style.gridTemplateRows = rowSizes;
      grid.style.gridTemplateColumns = colSizes;
    } else {
      grid.style.gridTemplateRows = 'repeat(3, 1fr)';
      grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
  }

  // 添加一個更穩健的YouTube ID提取方法
  extractYouTubeId(url) {
    if (!url) return '';
    // 處理短網址 youtu.be
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split(/[?&#]/)[0];
    }
    // 處理標準網址 youtube.com/watch?v=
    else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      return urlParams.get('v');
    }
    // 處理嵌入網址 youtube.com/embed/
    else if (url.includes('youtube.com/embed/')) {
      return url.split('youtube.com/embed/')[1].split(/[?&#]/)[0];
    }
    // 如果無法解析，直接返回原始字符串 (假設它可能是ID本身)
    return url;
  }
}

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
  new DynamicFrameLayout();
}); 
