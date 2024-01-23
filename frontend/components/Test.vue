<template>
    Hello World!
    <button @click="login">Click to Login</button>
    <button @click="check">Check user</button>
    <button @click="check">Test data</button>
</template>

<script setup>
async function login() {
    const { data } = await useFetch('https://cms.plumduffer.lndo.site/api/guests/login', {
        method: 'POST',
        credentials: 'include',
        body: {
            email: 'guest@local.host',
            password: 'password'
        }
    })
    console.log(data.value)
}

async function check() {
    const { data } = await useFetch('https://cms.plumduffer.lndo.site/api/guests/me', {
        credentials: 'include',
    })
    console.log(data.value)
}
</script>