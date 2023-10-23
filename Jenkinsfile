pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'adamlahbib/my-nest-app'
        TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
            post {
                success {
                    echo 'Successfully checked out code'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.build("${DOCKER_HUB_REPO}:${TAG}", "--file Dockerfile --target build .")
                }
            }
            post {
                success {
                    echo 'Successfully built image'
                }
                failure {
                    echo 'Failed to build image'
                }
            }
        }

       /* stage('Test') {
            steps {
                script {
                    docker.build("${DOCKER_HUB_REPO}:${TAG}", "--file Dockerfile --target test .")
                }
            }
            post {
                success {
                    echo 'Successfully tested image'
                }
                failure {
                    echo 'Failed to test image'
                }
            }
        }*/
        
        stage('Final') {
            steps {
                script {
                    docker.build("${DOCKER_HUB_REPO}:${TAG}", "--file Dockerfile --target final .")
                }
            }
            post {
                success {
                    echo 'Successfully built final image'
                }
                failure {
                    echo 'Failed to build final image'
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_HUB_REPO}:${TAG}").push()
                    }
                }
            }
            post {
                success {
                    echo 'Successfully pushed image'
                }
                failure {
                    echo 'Failed to push image'
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
    
}
