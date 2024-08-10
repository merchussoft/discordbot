pipeline {
    agent any

    stages {

        stage('install_dependice_yarn_global') {
            steps {
                sh 'npm install -g yarn'
            }
        }

        stage('install_dependices') {
            steps {
                sh 'yarn install'
            }
        }

        stage('build_app') {
            steps {
                sh 'yarn start'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}