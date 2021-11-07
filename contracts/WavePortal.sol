// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    struct VideoSuggestion {
        string url;
        uint256 likes;
    }

    VideoSuggestion[] videoSuggestions;

    constructor() {
        console.log("Hello Web3!");
        //videoSuggestions = new VideoSuggestion[](0);
        console.log("videoSuggestions array has length %d", videoSuggestions.length);
    }

    function suggest(string memory _url) public {
        VideoSuggestion memory suggestion = VideoSuggestion(_url, 0);
        videoSuggestions.push(suggestion);
        console.log("%s has suggested a video: %s! videoSuggestions now contains %d suggestions", msg.sender, _url, videoSuggestions.length);
    }

    function like (uint _index) public {
        if (_index < 0 || _index >= videoSuggestions.length) {
            console.log("like() calles with illegal index: %d, list-length: %s", _index, videoSuggestions.length);
            return;
        }

        videoSuggestions[_index].likes++;
        console.log("%s has liked a video: %s has %d likes now!", msg.sender, videoSuggestions[_index].url, videoSuggestions[_index].likes);

    }

    function getSuggestionsCount() public view returns (uint256) {
        console.log("We have collected %d suggestions so far", videoSuggestions.length);
        return videoSuggestions.length;
    }

    function listSuggestions() public view {
        console.log("Suggestions:");
        for (uint i = 0; i < videoSuggestions.length; i++) {
            console.log("#%d: %s, %d Likes", i, videoSuggestions[i].url, videoSuggestions[i].likes);
        }
    }
}