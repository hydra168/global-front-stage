module.exports = {
  async preProcess() {
    const path = require('path');
    const fs = require('fs');
    const gitRevision = require(path.resolve('./node_modules/git-revision-webpack-plugin'));
    const revision = new gitRevision();
    const info = require(path.resolve('./node_modules/git-describe')).gitDescribeSync();
    // const shell = require(path.resolve('./node_modules/shell-exec'));
    let commits;

    process.env.VUE_APP_GIT_VERSION = JSON.stringify(revision.version());
    process.env.VUE_APP_GIT_COMMITHASH = JSON.stringify(revision.commithash());
    process.env.VUE_APP_GIT_BRANCH = JSON.stringify(revision.branch());
    process.env.VUE_APP_GIT_TAG = JSON.stringify(info.tag);

    // 產生版本號檔案static/

    // await shell(`npm list |grep 'global-front-stage'`)
    //   .then(rs => {
    //     const resolve = rs.stdout.replace(/\s/g, '');
    //     process.env.VUE_APP_GIT_GLOBAL_FRONT_STAGE_VERSION = resolve.replace(/^.*global-front-stage@(\d+(\.\d+)*).*$/gi, 'v$1');
    //     process.env.VUE_APP_GIT_GLOBAL_FRONT_STAGE_COMMITHASH = resolve.replace(/^.*[#]([\w\d]+)[)]$/gi, '$1');
    //   })
    //   .catch(ex => console.log(`failed: ${ex}`));

    // await shell(`git log HEAD`)
    //   .then(rs => {
    //     commits = rs.stdout.replace(/[<].*[>]/g, '').replace(/\n\ncommit/g, '\n\n;commit');
    //   })
    //   .catch(ex => console.log(`failed: ${ex}`));

    // 站台版本號
    await spawnChild('git log HEAD').then(
      data => {
        commits = data.replace(/[<].*[>]/g, '').replace(/\n\ncommit/g, '\n\n;commit');
      },
      err => {
        console.log(`failed: ${err}`);
      }
    );

    const {
      VUE_APP_GIT_GLOBAL_FRONT_STAGE_VERSION,
      VUE_APP_GIT_GLOBAL_FRONT_STAGE_COMMITHASH,
      VUE_APP_GIT_VERSION,
      VUE_APP_GIT_COMMITHASH,
      VUE_APP_GIT_BRANCH,
      VUE_APP_GIT_TAG,
    } = process.env;
    const details = commits
      .split(';')
      .filter(desc => !/Merge|auto deploy/gi.test(desc))
      .slice(0, 100);
    const globalCommits = fs
      .readFileSync(path.resolve('./node_modules/global-front-stage/commits.log'), 'utf8')
      .replace(/[<].*[>]/g, '')
      .replace(/\n\ncommit/g, '\n\n;commit')
      .split(';')
      .filter(desc => !/Merge|auto deploy/gi.test(desc))
      .slice(0, 500);

    fs.writeFileSync(
      path.resolve('./public/version.json'),
      JSON.stringify(
        {
          DEPLOY_TIME: new Date(),
          GIT_GLOBAL_FRONT_STAGE_VERSION: VUE_APP_GIT_GLOBAL_FRONT_STAGE_VERSION,
          GIT_GLOBAL_FRONT_STAGE_COMMITHASH: VUE_APP_GIT_GLOBAL_FRONT_STAGE_COMMITHASH,
          GIT_GLOBAL_FRONT_STAGE_COMMITDETAIL: globalCommits,
          GIT_VERSION: VUE_APP_GIT_VERSION,
          GIT_COMMITHASH: VUE_APP_GIT_COMMITHASH,
          GIT_BRANCH: VUE_APP_GIT_BRANCH,
          GIT_TAG: VUE_APP_GIT_TAG,
          GIT_COMMITDETAIL: details,
        },
        null,
        2
      ),
      err => {
        if (err) console.log(err);
        else {
          process.env.packageVersionSuccess = true;
        }
      }
    );
  },
};
async function spawnChild(cmd) {
  const { exec } = require('child_process');
  const child = exec(cmd);

  let data = '';
  for await (const chunk of child.stdout) {
    // console.log('stdout chunk: ' + chunk);
    data += chunk;
  }
  let error = '';
  for await (const chunk of child.stderr) {
    // console.error('stderr chunk: ' + chunk);
    error += chunk;
  }
  const exitCode = await new Promise((resolve, reject) => {
    child.on('close', resolve);
  });

  if (exitCode) {
    throw `subprocess error exit ${exitCode}, ${error}`;
  }
  return data;
}
