pipeline {
  agent { label 'docker-agent' }

  options {
    disableConcurrentBuilds()
    // buildDiscarder(logRotator(numToKeepStr: '20'))
 buildDiscarder(logRotator(numToKeepStr: '10', daysToKeepStr: '10'))  }

  environment {
    GHCR_USER = '6sense-technologies'
    GHCR_REPO = 'dep-shield-client'
    SHORT_SHA = "${env.GIT_COMMIT.take(7)}"
    IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}-${env.SHORT_SHA}".toLowerCase()
    DEPLOY_URL = 'https://depshield.6sensehq.com'
    INFISICAL_PATH = 'dep-shield-client'
  }

  stages {
    stage('📦 Checkout Source Code') {
      when {
        anyOf {
          branch 'main'
          branch 'master'
          // branch 'test'
        }
      }
      steps {
        script {
          env.DEPLOY_URL = (env.BRANCH_NAME == 'test') ? 'https://depshield-test.6sensehq.com' : 'https://depshield.6sensehq.com'
          def deployUrl = env.DEPLOY_URL
          def repo = getRepoFromGitUrl()
          env.DEPLOYMENT_ID = createAndUpdateGitHubDeployment(repo, env.GIT_COMMIT, env.BRANCH_NAME, (env.BRANCH_NAME == 'test') ? 'Preview' : 'Production', deployUrl)
        }
        checkout scm
      }
    }

    stage('🔨 Build Docker Image') {
      when {
        anyOf {
          branch 'main'
          branch 'master'
          // branch 'test'
        }
      }
      steps {
        sh "docker build -t ghcr.io/${GHCR_USER}/${GHCR_REPO}:${IMAGE_TAG} ."
      }
    }

    stage('📤 Push to GHCR') {
      when {
        anyOf {
          branch 'main'
          branch 'master'
          // branch 'test'
        }
      }
      steps {
        script {
          def deployUrl = env.DEPLOY_URL
          def repo = getRepoFromGitUrl()
          updateGitHubDeploymentStatus(repo, env.BUILD_URL, env.DEPLOYMENT_ID, 'in_progress', (env.BRANCH_NAME == 'test') ? 'Preview' : 'Production', env.DEPLOY_URL)
        }
        withCredentials([usernamePassword(credentialsId: 'github-pat-6sensehq', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_PAT')]) {
          sh '''
            echo $GITHUB_PAT | docker login ghcr.io -u $GITHUB_USER --password-stdin
            docker push ghcr.io/${GHCR_USER}/${GHCR_REPO}:${IMAGE_TAG}
          '''
        }
      }
    }

    stage('🚀 Deploy to Server') {
      when {
        anyOf {
          branch 'main'
          branch 'master'
          // branch 'test'
        }
      }
      steps {
        script {
          def infisicalEnv = (env.BRANCH_NAME == 'test') ? 'dev' : 'prod'
          def deployDir = (env.BRANCH_NAME == 'test') ? "${env.GHCR_REPO}-test" : "${env.GHCR_REPO}-prod"
          def deployEnv = infisicalEnv
          def deployUrl = env.DEPLOY_URL
          def repo = getRepoFromGitUrl()

          updateGitHubDeploymentStatus(repo, env.BUILD_URL, env.DEPLOYMENT_ID, 'in_progress', (env.BRANCH_NAME == 'test') ? 'Preview' : 'Production', env.DEPLOY_URL)

          withInfisical(configuration: [
            infisicalCredentialId: '6835f2d1ccea8e1cb5ed81e2',
            infisicalEnvironmentSlug: infisicalEnv,
            infisicalProjectSlug: 'depshield-hq4-l',
            infisicalUrl: 'https://infisical.6sensehq.com'
          ],
          infisicalSecrets: [
            infisicalSecret(
              includeImports: true,
              path: "/${env.INFISICAL_PATH}",
              secretValues: [
                [infisicalKey: 'SENTRY_AUTH_TOKEN'],
                [infisicalKey: 'SENTRY_SUPPRESS_TURBOPACK_WARNING'],
                [infisicalKey: 'NEXT_PUBLIC_SENTRY_DSN'],
                [infisicalKey: 'NEXT_LOCAL'],
                [infisicalKey: 'NEXT_TEMP'],
                [infisicalKey: 'NEXT_PUBLIC_BACKEND_URL'],
                [infisicalKey: 'AUTH_SECRET'],
                [infisicalKey: 'AUTH_GOOGLE_ID'],
                [infisicalKey: 'AUTH_GOOGLE_SECRET'],
                [infisicalKey: 'NEXT_PUBLIC_GITHUBAPP_URL'],
                [infisicalKey: 'GITHUB_ID'],
                [infisicalKey: 'GITHUB_SECRET'],
                [infisicalKey: 'AUTH_TRUST_HOST'],
                [infisicalKey: 'HOST_PORT'],                
              ]
            )
          ]) {
            // env.DEPLOYMENT_ID = createAndUpdateGitHubDeployment(repo, env.GIT_COMMIT, env.BRANCH_NAME, deployEnv, deployUrl)
            
            withCredentials([usernamePassword(credentialsId: 'github-pat-6sensehq', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_PAT')]) {
              writeFile file: '.env', text: """\
SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
SENTRY_SUPPRESS_TURBOPACK_WARNING=${SENTRY_SUPPRESS_TURBOPACK_WARNING}
NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
NEXT_LOCAL=${NEXT_LOCAL}
NEXT_TEMP=${NEXT_TEMP}
NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
AUTH_SECRET=${AUTH_SECRET}
AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
AUTH_TRUST_HOST=${AUTH_TRUST_HOST}
NEXT_PUBLIC_GITHUBAPP_URL=${NEXT_PUBLIC_GITHUBAPP_URL}
GITHUB_ID=${GITHUB_ID}
GITHUB_SECRET=${GITHUB_SECRET}
AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
CONTAINER_NAME=${deployDir}
HOST_PORT=${HOST_PORT}
IMAGE_TAG=${IMAGE_TAG}
NODE_ENV=production
"""

              sshagent(credentials: ['ssh-6sensehq']) {
                sh """
                  ssh -o StrictHostKeyChecking=no jenkins-deploy@95.216.144.222 "mkdir -p ~/${deployDir}"
                  scp -o StrictHostKeyChecking=no docker-compose.yml jenkins-deploy@95.216.144.222:~/${deployDir}/
                  scp -o StrictHostKeyChecking=no .env jenkins-deploy@95.216.144.222:~/${deployDir}/

                  ssh -o StrictHostKeyChecking=no jenkins-deploy@95.216.144.222 '
                    cd ~/${deployDir} &&
                    echo "$GITHUB_PAT" | docker login ghcr.io -u $GITHUB_USER --password-stdin &&
                    docker compose pull &&
                    docker compose up -d --remove-orphans
                    echo "Cleaning up"
                    docker container prune -f
                    docker image prune -a -f
                    docker volume prune -f
                    docker network prune -f
                    docker builder prune -f
                  '
                """
              }
            }
          }
        }
      }
    }
  }

  post {
    success {
      script {
        def repo = getRepoFromGitUrl()
        updateGitHubDeploymentStatus(repo, env.BUILD_URL, env.DEPLOYMENT_ID, 'success', (env.BRANCH_NAME == 'test') ? 'Preview' : 'Production', env.DEPLOY_URL)
      }
    }
    failure {
      script {
        def repo = getRepoFromGitUrl()
        updateGitHubDeploymentStatus(repo, env.BUILD_URL, env.DEPLOYMENT_ID ?: '0', 'failure', (env.BRANCH_NAME == 'test') ? 'Preview' : 'Production', env.DEPLOY_URL)
      }
    }
    always {
      echo "🧹 Running Docker cleanup..."
      sh '''
        docker container prune -f
        docker image prune -a -f
        docker volume prune -f
        docker network prune -f
        docker builder prune -f
      '''
    }
  }
}

// -------------------
// GitHub API Helpers
// -------------------
def getRepoFromGitUrl() {
  def url = env.GIT_URL
  if (!url || url.trim() == '') {
    url = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
  }
  if (url.startsWith("git@github.com:")) {
    return url.replace("git@github.com:", "").replace(".git", "")
  } else if (url.startsWith("https://github.com/")) {
    return url.replace("https://github.com/", "").replace(".git", "")
  } else {
    error("Unknown Git URL format: ${url}")
  }
}

def createAndUpdateGitHubDeployment(String repo, String ref, String branch, String deployEnv, String deployUrl) {
  withCredentials([usernamePassword(credentialsId: 'github-pat-6sensehq', usernameVariable: 'GH_USER', passwordVariable: 'GITHUB_PAT')]) {
    withEnv(["TOKEN=${GITHUB_PAT}"]) {
      def description = "Deployed from Jenkins pipeline for branch ${branch}"
      def rawResponse = sh(
        script: """
          curl -s -X POST \\
            -H 'Authorization: token $TOKEN' \\
            -H 'Accept: application/vnd.github+json' \\
            https://api.github.com/repos/${repo}/deployments \\
            -d '{
              "ref": "${ref}",
              "task": "deploy",
              "auto_merge": false,
              "required_contexts": [],
              "description": "${description}",
              "environment": "${deployEnv}",
              "environment_url": "${deployUrl}",
              "sha": "${ref}"
            }'
        """,
        returnStdout: true
      ).trim()

      def deploymentId = sh(
        script: """
          echo '${rawResponse}' | grep -Eo '"id":[ ]*[0-9]+' | head -n1 | cut -d':' -f2
        """,
        returnStdout: true
      ).trim()

      if (!deploymentId || deploymentId == "null") {
        error("❌ Failed to extract deployment ID")
      }

      return deploymentId
    }
  }
}


def updateGitHubDeploymentStatus(String repo, String logUrl, String deploymentId, String status, String deployEnv, String deployUrl) {
  withCredentials([usernamePassword(credentialsId: 'github-pat-6sensehq', usernameVariable: 'GH_USER', passwordVariable: 'GITHUB_PAT')]) {
    withEnv(["TOKEN=${GITHUB_PAT}"]) {
      sh """
        curl -s -X POST \\
          -H 'Authorization: token $TOKEN' \\
          -H "Accept: application/vnd.github+json" \\
          https://api.github.com/repos/${repo}/deployments/${deploymentId}/statuses \\
          -d '{
            "state": "${status}",
            "log_url": "${logUrl}",
            "description": "Deployment ${status}",
            "environment": "${deployEnv}",
            "environment_url": "${deployUrl}"
          }'
      """
    }
    
  }
}
