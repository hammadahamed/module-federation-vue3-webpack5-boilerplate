<script setup lang="ts">
import { ref } from "vue";

// Define the testimonials data
const testimonials = ref([
  {
    text: "Thesee app completely transformed my daily routine. It's so easy to use and has made my life much easier.",
    author: "Jane Doe",
  },
  {
    text: "I never knew I needed this app until I started using it. Now, I can't imagine life without it. Highly recommend!",
    author: "John Smith",
  },
  {
    text: "The customer service is top-notch. They answered all my questions and helped me get started in no time.",
    author: "Emily Johnson",
  },
  {
    text: "A fantastic app with a clean interface and lots of features. I especially love the notifications feature.",
    author: "Michael Brown",
  },
  {
    text: "Great app! It has really improved my productivity, and I love the user-friendly design.",
    author: "Sarah Wilson",
  },
  {
    text: "I've tried several apps like this, but this one is by far the best. It's well-designed and easy to navigate.",
    author: "David Clark",
  },
  {
    text: "I was skeptical at first, but this app has exceeded my expectations. It's become an essential part of my day.",
    author: "Laura Martinez",
  },
  {
    text: "An excellent app with a lot of potential. The recent updates have made it even better.",
    author: "James Lee",
  },
  {
    text: "This app is a game changer! It has everything I need and more. I can't recommend it enough.",
    author: "Linda Garcia",
  },
]);
</script>

<template>
  <div class="testimonials-grid">
    <h1>Remote 3</h1>
    <div
      v-for="(testimonial, index) in testimonials"
      :key="index"
      class="testimonial"
    >
      <p style="color: black">{{ testimonial.text }}</p>
      <p>
        <strong>- {{ testimonial.author }}</strong>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 16px;
  grid-auto-rows: auto;

  .testimonial {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    align-self: start;

    p {
      margin: 0 0 8px;
    }

    strong {
      display: block;
      margin-top: 8px;
      color: rebeccapurple;
    }
  }
}
</style>
