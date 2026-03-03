pipeline {
    agent { label 'built-in' }
    environment {
        DOCKER_HUB_USER = credentials('DOCKER_HUB_USER')
        IMAGE_NAME = "${DOCKER_HUB_USER}/trellis-frontend"
        VITE_API_URL = credentials('VITE_API_URL')
        VITE_CLOUD_NAME = credentials('VITE_CLOUD_NAME')
        RENDER_DEPLOY_HOOK = credentials('RENDER_FRONTEND_HOOK')
        SHORT_SHA = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }
    stages {
        stage('Setup & Lint') {
            steps {
                sh 'npm install'
                sh 'npm run lint'
            }
        }
        stage('Build UI & Containerize') {
            steps {
                script {
                    docker.withRegistry('', 'DOCKER_HUB_CREDS') {
                        // Build-args are passed here so Vite can bake them into the JS
                        def frontendImage = docker.build("${IMAGE_NAME}:${SHORT_SHA}", 
                            "--build-arg VITE_API_URL=${VITE_API_URL} --build-arg VITE_CLOUD_NAME=${VITE_CLOUD_NAME} .")
                        frontendImage.push()
                        frontendImage.push('latest')
                    }
                }
            }
        }
        stage('Deploy UI to Render') {
            steps {
                sh "curl -X GET '${RENDER_DEPLOY_HOOK}&imgURL=docker.io/${IMAGE_NAME}:${SHORT_SHA}'"
            }
        }
    }
    post {
        always { sh "docker rmi ${IMAGE_NAME}:${SHORT_SHA} || true" }
    }
}