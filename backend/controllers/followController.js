const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

/*
    @desc       Follow user
    @route      POST /api/follow
    @access     Private
*/
const followUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const targetUser = await User.findById(req.params.id);

  if (targetUser) {
    // targetUser get follower
    targetUser.followers.push({
      username: currentUser.username,
      picture: currentUser.picture ? currentUser.picture : null,
    });

    // currentUser get following
    currentUser.followings.push({
      username: targetUser.username,
      picture: targetUser.picture ? targetUser.picture : null,
    });

    await targetUser.save();
    await currentUser.save();

    res.status(200).json({
      message: "Follow Success",
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports = {
  followUser,
};
