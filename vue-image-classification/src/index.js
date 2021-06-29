const unplash_base_url = "https://api.unsplash.com"
const UNPLASH_ACCESS_KEY = "GDZxEv4xw1vbqcihzkDlVBgPZ088cKGU0OTNy5EASq4"

// Declarative rendering
const app = Vue.createApp({
	data() {
		return {
			query: "",
			classification: "",
			images: [],
			loading: false
		}
	},
	methods: {
		searchImage() {
			const query = this.query
			if (query.length) {
				this.loading = true
				axios.get(`${unplash_base_url}/search/photos?query=${query}&page=${1}&per_page=${9}&order_by=${"relevant"}&client_id=${UNPLASH_ACCESS_KEY}`)
				.then((response) => {
					response.data?.results.map(item => {
						this.images.push({
							id: item.id,
							alt_description: item.description,
							created_at: item.created_at,
							likes: item.likes,
							url: item.links.download,
							width: item.width,
							height: item.height,
							tags: item.tags.map(tag => tag.title)
						})
					})
					this.loading = false
					console.info(response.data.results)
				})
				.catch(err => {
					console.error(err)
					alert(err.message)
					this.loading = false
				})
			}
		}
	}
})

app.mount("#app")