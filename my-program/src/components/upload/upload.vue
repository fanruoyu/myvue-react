<template>
	<div class="upload">
		<form enctype="multipart/form-data">
			<input type="file" id="uploader" name="file" @change="changeFn"/>
			<div id="">
				<img :src="imageUrl"/>
			</div>
		</form>
		
	</div>
</template>
<script>
	export default {
		data () {
			return {
				imageUrl: ''
			}
		},
		methods: {
			changeFn (e) {
					var formData = new FormData();
					formData.append("file", e.target.files[0]);
					let data = formData.get('file')
				this.$http.post('/api/upload', formData).then(res => {
					console.log(res.data)
				})
			}
		}
	}
</script>
