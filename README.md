# Project Jarvis: Jenkins Client

Jarvis is a Jenkins client application built using the Jenkins API and the Tauri framework. This application is designed to provide a user-friendly interface for interacting with Jenkins servers, making it easier to manage and monitor your Jenkins pipelines and jobs. Whether you're a developer or a system administrator, Project Jarvis simplifies your Jenkins-related tasks.

## 1. Introduction

Project Jarvis is a cross-platform application that allows you to:

- View and monitor Jenkins pipelines and jobs.
- Trigger Jenkins builds and deployments.
- View build logs and job statuses.
- ...

This README will guide you through running, building and contributing to Jarvis

## 2. Prerequisites

Before you get started, ensure that you have the following prerequisites installed on your system:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- Rust: See [Rust Installation](#rust-installation) for instructions on installing Rust.
- Jenkins Server: You will need access to a Jenkins server with sufficient permissions to interact with its APIs. Ensure that you have the necessary credentials and permissions to perform the desired Jenkins operations.

## 3. Setup
### Setup for Production
```bash
# Clone the Project Jarvis repository
git clone https://github.com/JarvisClient/Client

# Install project dependencies
npm install

# Build the application
npm run tauri build
```

This will generate platform-specific binaries in the `./src-tauri/target/release` directory.

### Setup for Development
```bash
# Clone the Project Jarvis repository
git clone https://github.com/JarvisClient/Client

# Install project dependencies
npm install

# Run the application
npm run tauri dev
```

## Ensuring Quality
### Running Tests

To run tests for Project Jarvis, use the following command:

```bash
npm test
```

### Linting

To lint the code and ensure code quality, run the following command:

```bash
npm run lint
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## Contributing
We welcome contributions from the community to help improve Project Jarvis. Whether you want to fix a bug, add a new feature, or enhance the documentation, your contributions are valuable. Here's how you can get started with contributing:

**Check Our Jira:** Before you start contributing, please check our [Jira project](https://jarvisci.com) to see if the feature you're interested in, or the issue you'd like to work on, has already been requested or is currently in progress. This can help you align your efforts with the project's goals and ongoing work.

### 1. Fork the Repository
If you haven't already, fork the Project Jarvis repository to your GitHub account. This will create a copy of the repository under your account, which you can freely modify.

### 2. Clone Your Fork
Clone your forked repository to your local development environment using the following command, replacing [your-username] with your GitHub username:

```bash
git clone https://github.com/[your-username]/Client.git
```

### 3. Create a new Branch
Create a new Git branch for your contribution. A descriptive branch name is recommended to explain the purpose of your changes. Use the following command to create and switch to a new branch:

### 4. Make Changes
Make the necessary changes to the codebase, following the project's coding standards and guidelines. Ensure that your changes are well-documented and include appropriate comments where necessary.

### 5. Test Your Changes
Before committing, thoroughly test your changes to ensure they work as expected and do not introduce new issues. Run any relevant tests if they are available. If needed, write new tests to cover your changes.

Additionally, ensure that:

The code passes the project's linter without any errors or warnings. Fix any linting issues that may arise during development.
All existing tests, if available, pass successfully without failures. If you encounter test failures, investigate and address them before proceeding.

### 6. Commit Your Changes
Once you are satisfied with your changes and they have been tested, commit them using descriptive commit messages. Be sure to reference any related issues or pull requests in your commits.
```bash
git commit -m "Add new feature: Description of the feature"
```
### 7. Push Your Changes
Push your committed changes to your forked repository on GitHub:
```bash
git push origin feature/new-feature
```

### 8. Create a Pull Request
Navigate to the original Project Jarvis repository on GitHub, and you should see a notification prompting you to create a pull request from your new branch. Click on it, review your changes, and provide a meaningful title and description for your pull request.

### 9. Continuous Integration and Code Review
Your pull request will trigger automated tests and code review by maintainers and contributors. Address any feedback or issues raised during the review process.

### 10. Merge Your Pull Request
Once your pull request is approved and all checks pass, a project maintainer will merge it into the main codebase.