interface BuildWithParametersOptions {
    baseurl: string | null;
    username: string | null;
    apitoken: string | null;
    projectName: string | null;
    params: { [key: string]: any };
}

export const buildWithParameters = async ({ baseurl, username, apitoken, projectName, params }: BuildWithParametersOptions) => {
    let URL = `${baseurl}job/${projectName}/buildWithParameters`;

    await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(username + ":" + apitoken),
        },
        body: JSON.stringify(params),
    })
    
};
