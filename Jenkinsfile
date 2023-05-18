pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building..'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing..'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'

        script {
          //app = docker.build("vue-front:1.0.0-${BUILD_NUMBER}")
        }

        //sh 'sudo docker run -p 8080:8080 --network="host" -d vue-front:1.0.0-${BUILD_NUMBER}'
      }
    }
  }
}vue