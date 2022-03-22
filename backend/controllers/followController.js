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
    // if targetUser alrady followed, then unfollow
    if (targetUser.followers.find((f) => f.username === currentUser.username)) {
      targetUser.followers = targetUser.followers.filter(
        (f) => f.username !== currentUser.username
      );
      // currentUser remove following
      currentUser.followings = currentUser.followings.filter(
        (f) => f.username !== targetUser.username
      );
    } else {
      // if not follow, then targetUser get follower
      targetUser.followers.push({
        userId: currentUser._id,
        username: currentUser.username,
        picture: currentUser.picture ? currentUser.picture : null,
      });

      // and currentUser get following
      currentUser.followings.push({
        userId: targetUser._id,
        username: targetUser.username,
        picture: targetUser.picture ? targetUser.picture : null,
      });
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      message: "Success!",
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }

  // if (targetUser) {
  //   // targetUser get follower
  //   targetUser.followers.push({
  //     username: currentUser.username,
  //     picture: currentUser.picture ? currentUser.picture : null,
  //   });

  //   // currentUser get following
  //   currentUser.followings.push({
  //     username: targetUser.username,
  //     picture: targetUser.picture ? targetUser.picture : null,
  //   });

  //   await targetUser.save();
  //   await currentUser.save();

  //   res.status(200).json({
  //     message: "Follow Success",
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("User not found");
  // }
});

const unfollowUser = asyncHandler(async (req, res) => {
  // const currentUser = req.user;
  // const targetUser = await User.findById(req.params.id);
  // if (targetUser) {
  //   // targetUser lost follower
  //   if (targetUser.followers.find((f) => f.username === currentUser.username)) {
  //     targetUser.followers.filter(f => f.username !==);
  //   }
  // }
});

module.exports = {
  followUser,
  unfollowUser,
};
