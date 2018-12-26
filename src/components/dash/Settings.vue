<template>
    <div id="settings">
        <form  class="form-horizontal">
            <div class="form-group valign">
                <label class="col-sm-2 control-label">Avatar</label>
                <div class="col-sm-10 text-center">
                    <img :src="image ? image : user.avatar" class="rounded-circle"><br>
                    <div class="fileUpload btn btn-default">
                        <span>Select a file</span>
                        <input type="file" class="upload" id="imageFile" @change="fileChanged">
                    </div>
                    <button type="button" v-show="image" @click="uploadAvatar" class="btn btn-primary">Update</button>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Username</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="user.username">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">About</label>
                <div class="col-sm-10">
                    <textarea rows="10" class="form-control" v-model="user.about"></textarea>
                </div>
            </div>
            <p class="text-right">
                <button class="btn btn-primary" type="button" @click="updateSettings">Update Info</button>
            </p>
        </form>
    </div>
</template>

<script>
    import clone from 'lodash/clone'

    export default {
        name: "Settings",
        data: function () {
            return {
                image: null
            }
        },
        computed: {
            user: function () {
                return clone(this.$store.state.currentUser);
            }
        },
        methods: {
            fileChanged: function (e) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);

                let self = this;
                reader.onload = function (e) {
                    self.image = e.target.result;
                }
            },
            uploadAvatar: function () {
                let formData = new FormData();
                formData.append("avatar", document.getElementById('imageFile').files[0]);

                this.$http.put('/users/me/avatar', formData)
                    .then(function (res) {
                        this.user.avatar = res.body.avatar;
                        this.$store.commit('setCurrentUser', this.user);
                        this.image = null;

                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Avatar updated!',
                            text: 'You have successfully updated your avatar image'
                        });
                    })
            },
            updateSettings: function () {
                this.$http.put('/users/me', this.user)
                    .then(function (res) {
                        this.$store.commit('setCurrentUser', this.user);

                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Info updated!',
                            text: 'You have successfully updated your profile information'
                        });
                    })
            }
        }
    }
</script>

<style scoped>
    #settings img {
        max-width: 200px;
        display: inline-block;
        margin-bottom: 20px;
    }

    .fileUpload {
        position: relative;
        overflow: hidden;
        margin: 10px;
    }
    .fileUpload input.upload {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
    }
</style>
