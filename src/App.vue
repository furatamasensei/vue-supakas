<script setup lang="ts">
import type { Session } from '@supabase/supabase-js'
import { ref } from 'vue'
import { useAuthClient } from './composables/useAuthClient'

const auth = useAuthClient()
const isSigningIn = ref(false)
const session = ref<Session | null>(null)

async function signInWithKaspa() {
  isSigningIn.value = true

  const { error: signInError } = await auth.signInWithWeb3({ chain: 'kaspa' })
  if (signInError) {
    console.error('Error during Kaspa sign-in:', signInError)
    isSigningIn.value = false
    return
  }

  const { data: sessionData, error: sessionError } = await auth.getSession()
  if (sessionError) {
    console.error('Error fetching session after Kaspa sign-in:', sessionError)
    isSigningIn.value = false
    return
  }

  session.value = sessionData.session
  isSigningIn.value = false
}
</script>

<template>
  <div class="container">
    <button :disabled="isSigningIn" class="button" @click="signInWithKaspa">
      Sign in with Kaspa
    </button>
    <pre v-if="session" class="session-card">{{ session }}</pre>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}

.button {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background-color: #131313;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:disabled {
  background-color: #777777;
  cursor: not-allowed;
}

.button:hover {
  background-color: #333333;
}

.session-card {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  width: 80%;
  word-wrap: break-word;
  overflow-x: auto;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
