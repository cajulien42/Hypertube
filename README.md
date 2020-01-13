#Hypertube Project
**WORKFLOW INFORMATIONS**

We decided to use Git Feature Branch Workflow as described in the [following link](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) !


**Branch naming convention**   
__Working on a feature__ : {Committer_name} / {feature_name}   
__Fixing a problem__ : {Committer_name} / {fix_name}

__Push Rules__

* No push on the master branch   
* One branch per feature   
* Any feature pushed must include related test   

#Common Cases
* __You want to start a new feature from the master branch__   
1 . Make sure you're on the master branch   
` git checkout master`   
2 . Fetch latest commits   
`git fetch origin`   
3 . Make sure your master is up to date with origin/master
`git reset --hard origin/master`   
4 . create your new branch and go on it   
`git checkout -b {branchName}`   
 5 . Make sure your branch is available remotly
`git push -u origin {branchName}`

* __You want to push on master ?__   
1 . Make sure you're on the right branch   
` {branchName}`   
2 . Only add modification in the feature related files
__No git add -A !__  
`git add {FilePath}`   
3 . Commit and push your changes   
`git commit -m {message}`   
4 . Push to the remote branch   
`git push -u origin {branchName}`   
 5 . Fill a pull request on github, selecting Master branch and your branch

#Particular cases
Please report to BenjaminTle if you got any trouble with this repo and/or workflow to help fill this section
