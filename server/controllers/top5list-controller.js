const Top5List = require('../models/top5list-model');
const User = require('../models/user-model');

createTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    const top5List = new Top5List(body);
    console.log("creating top5List: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    // REMEMBER THAT OUR AUTH MIDDLEWARE GAVE THE userId TO THE req
    console.log("top5List created for " + req.userId);
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        top5List
            .save()
            .then(() => {
                return res.status(201).json({
                    top5List: top5List
                })
            })
            .catch(error => {
                return res.status(400).json({
                    errorMessage: "Top 5 List Not Created!"
                })
            })
    })
}
deleteTop5List = async (req, res) => {
    console.log("delete Top 5 List with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Top 5 List not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            Top5List.findOneAndDelete({ _id: req.params.id }, () => {
                return res.status(200).json({});
            }).catch(err => console.log(err))
        }
        asyncFindUser(top5List);
    })
}
getTop5ListById = async (req, res) => {
    console.log("Find Top 5 List with id: " + JSON.stringify(req.params.id));

    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            return res.status(200).json({ success: true, top5List: list })
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}
getTop5ListPairs = async (req, res) => {
    console.log("getTop5ListPairs");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindList() {
            await Top5List.find({ }, (err, top5Lists) => {
                console.log("found Top5Lists: " + JSON.stringify(top5Lists));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (top5Lists === null) {
                    console.log("!top5Lists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Top 5 Lists not found' })
                }
                else {
                    console.log("Send the Top5List pairs");
                    return res.status(200).json({ success: true, idNamePairs: top5Lists })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList();
    }).catch(err => console.log(err))
}
getTop5ListsByEmail = async (req, res) => {
    await User.findOne({ _id: req.userId }, (err, user) => {
        //console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all Top5Lists owned by " + email);
            await Top5List.find({ ownerEmail: email }, (err, top5Lists) => {
                console.log("found Top5Lists: " + JSON.stringify(top5Lists));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (top5Lists === null) {
                    console.log("!top5Lists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Top 5 Lists not found' })
                }
                else {
                    console.log("Send the Top5List pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    return res.status(200).json({ success: true, top5Lists: top5Lists })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(req.params.email);
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (top5Lists === null) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        console.log(top5Lists);
        return res.status(200).json({ success: true, top5Lists: top5Lists })
    }).catch(err => console.log(err))
}
updateTop5List = async (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    console.log("req.body.name, req.body.items: " + req.body.name + ", " + req.body.items);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            list.name = body.top5List.name;
            list.items = body.top5List.items;
            list.isPublished = body.top5List.isPublished;
            list.likes = body.top5List.likes;
            list.dislikes = body.top5List.dislikes;
            list.views = body.top5List.views;
            list.comments = body.top5List.comments;
            list.isCommunity = body.top5List.isCommunity;
            list.communityItems = body.top5List.communityItems;
            list.published = body.top5List.published;
            list
                .save()
                .then(() => {
                    console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: list._id,
                        message: 'Top 5 List updated!',
                    })
                })
                .catch(error => {
                    console.log("FAILURE: " + JSON.stringify(error));
                    return res.status(404).json({
                        error,
                        message: 'Top 5 List not updated!',
                    })
                })
        }
        asyncFindUser(top5List);
    })
}

module.exports = {
    createTop5List,
    deleteTop5List,
    getTop5ListById,
    getTop5ListPairs,
    getTop5Lists,
    updateTop5List,
    getTop5ListsByEmail
}