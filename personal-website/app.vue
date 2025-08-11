<template>
  <div class="home-container">
    <div class="content">
      <h1 class="name">Adam Hacker</h1>
      <p class="subtitle">Developer & Creator</p>
      <div class="description">
        <p>Building digital experiences with modern web technologies. YAYYYY heh</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content {
  text-align: center;
  color: white;
  max-width: 600px;
  padding: 2rem;
}

.name {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  margin: 1rem 0 0 0;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.description {
  margin-top: 2rem;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.description p {
  font-size: 1.1rem;
  opacity: 0.8;
  line-height: 1.6;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .name {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .description p {
    font-size: 1rem;
  }
}
</style>
