<script setup lang="ts">
import type { Session } from '@supabase/supabase-js'
import { ref } from 'vue'
import { useAuthClient } from './composables/useAuthClient'

const auth = useAuthClient()
const isSigningIn = ref(false)
const session = ref<Session | null>(null)
const error = ref<string | null>(null)


async function signInWithKaspa() {
  error.value = null
  isSigningIn.value = true

  const { error: signInError } = await auth.signInWithWeb3({
    chain: 'kaspa',
    address: 'kaspa:qz8ex99c82ghannv4p2cm3wtcw3yaezz63xkrsfwvmqq2l35knrv748u5e9ee',
    options: {
      signInWithKaspa: {
        chainId: 'kaspa_mainnet',
      },
    },
  })

  if (signInError) {
    error.value = signInError.message
    isSigningIn.value = false
    return
  }

  const { data: sessionData, error: sessionError } = await auth.getSession()
  if (sessionError) {
    error.value = sessionError.message
    isSigningIn.value = false
    return
  }

  session.value = sessionData.session
  isSigningIn.value = false
}

function signOut() {
  session.value = null
  error.value = null
}
</script>

<template>
  <div class="container">
    <template v-if="!session">
      <div class="form">
        <p v-if="error" class="error">{{ error }}</p>

        <button :disabled="isSigningIn" class="button" @click="signInWithKaspa">
          {{ isSigningIn ? 'Waiting for wallet…' : 'Sign in with Kaspa' }}
        </button>
      </div>
    </template>

    <template v-else>
      <div class="form">
        <h1 class="title">Signed in</h1>
        <pre class="session-card">{{ session }}</pre>
        <button class="button button--secondary" @click="signOut">Sign out</button>
      </div>
    </template>
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

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(420px, 90vw);
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #444;
}

.input {
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  width: 100%;
  box-sizing: border-box;
}

.input:disabled {
  background-color: #f3f3f3;
  color: #888;
}

.error {
  font-size: 0.875rem;
  color: #c00;
  word-break: break-word;
}

.button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #131313;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.25rem;
}

.button:disabled {
  background-color: #777;
  cursor: not-allowed;
}

.button:not(:disabled):hover {
  background-color: #333;
}

.button--secondary {
  background-color: transparent;
  color: #131313;
  border: 1px solid #ccc;
}

.button--secondary:not(:disabled):hover {
  background-color: #f3f3f3;
}

.session-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  word-wrap: break-word;
  overflow-x: auto;
  font-size: 0.8rem;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
