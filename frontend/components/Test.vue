<template>
    Hello World!
    <button @click="login">Click to Login as Viewer</button>
    <button @click="check">Check user</button>
    <button @click="data">Test data</button>
</template>

<script setup>
async function login() {
    const { data } = await useFetch('https://cms.plumduffer.lndo.site/api/users/login', {
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
    const { data } = await useFetch('https://cms.plumduffer.lndo.site/api/users/me', {
        credentials: 'include',
    })
    console.log(data.value)
}

async function data() {
    const { data } = await useFetch('https://cms.plumduffer.lndo.site/api/users', {
        credentials: 'include',
    })
    console.log(data.value)
}
</script>