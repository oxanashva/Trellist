pipeline {
    agent {
        docker { 
            image 'node:20-alpine' 
        }
    }
    environment {
        VITE_API_URL = credentials('VITE_API_URL')
        VITE_CLOUD_NAME = credentials('VITE_CLOUD_NAME')
        RENDER_DEPLOY_HOOK = credentials('RENDER_FRONTEND_HOOK')
        SHORT_SHA = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }
    stages {
        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo 'Linting...'
                sh 'npm run lint'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests...'
                sh 'npm run test' 
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building production assets...'
                sh 'npm run build'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Notifying Render to pull new changes...'
                sh "curl -X POST '${RENDER_DEPLOY_HOOK}'"
            }
        }
    }

    post {
        always {
            echo 'Cleaning up the workshop...'
            sh """
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{"text":"✅ SUCCESS: Deployment static assets completed for commit ${SHORT_SHA}"}' \
                    ${SLACK_WEBHOOK}
                """

            emailext(
                subject: "SUCCESS: Render Deployment static assets (${SHORT_SHA})",
                body: "Deployment static assets succeeded for commit ${SHORT_SHA}.",
                to: env.NOTIFY_EMAIL
            )
        }
        failure {
            echo 'Deployment static assets FAILED. Check the test logs!'

            sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{"text":"❌ FAILURE: Deployment static assets failed for commit ${SHORT_SHA}. Check Jenkins logs at ${env.BUILD_URL}"}' \
                ${SLACK_WEBHOOK}
            """
            emailext(
                subject: "FAILURE: Render Deployment static assets (${SHORT_SHA})",
                body: "Deployment static assets FAILED for commit ${SHORT_SHA}. Check Jenkins logs at ${env.BUILD_URL}",
                to: env.NOTIFY_EMAIL
            )
        }
    }
}