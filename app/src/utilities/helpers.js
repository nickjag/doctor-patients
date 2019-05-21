import moment from 'moment';
import md5 from 'md5';

export const setAvatar = (avatars, avatarId) =>
  avatars && avatarId && avatars[avatarId] ? avatars[avatarId] : null;

export const formatDate = date => moment(date).format('L');

export const yearOnly = date => moment(date).format('YYYY');

export const convertToTimestamp = str => {
  const date = new Date(str);
  return !date ? false : date.getTime();
};

export const getMovieDateRange = (type, movieObj, tvObj) => {
  // movie type
  if (type === 1 && movieObj && movieObj.release_date) {
    return yearOnly(movieObj.release_date);
  }

  // tv type
  if (type === 2 && tvObj && tvObj.first_air_date) {
    const dateStart = yearOnly(tvObj.first_air_date);

    if (tvObj.in_production) {
      return `${dateStart} - Present`;
    }
    if (tvObj.last_air_date) {
      const dateEnd = yearOnly(tvObj.last_air_date);
      return `${dateStart} - ${dateEnd}`;
    }
    return dateStart;
  }

  return null;
};

export const truncateWords = (str, max) => {
  const arr = str.split(' ');
  if (arr.length > max) {
    let newStr = arr.slice(0, max).join(' ');
    newStr += '...';
    return newStr;
  }
  return false;
};

export const truncateLetters = (str, max) => {
  if (str.length <= max) {
    return str;
  }
  return `${str.slice(0, max)}...`;
};

export const matchWord = (word, str) => {
  const exp = new RegExp(`(^|\\s)${word}(\\w+|\\s|$)`, 'gi');
  const wordMatches = str.match(exp);
  return wordMatches && wordMatches.length > 0;
};

export const matchTerm = (term, str) => {
  const parts = term.split(' ');
  const termMatches = parts.filter(part => matchWord(part, str));
  return termMatches && termMatches.length > 0;
};

export const createMessageKey = userIds => {
  const userIdsStr = userIds.sort().join('-');
  return md5(userIdsStr);
};

export const jsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const unreadMessagesCount = (messages = []) =>
  messages.reduce((acc, message) => {
    if (message.count) {
      return parseInt(acc, 10) + parseInt(message.count, 10);
    }
    return acc;
  }, 0);

export const getDocViewTop = () => {
  const doc = document.documentElement;
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
};

export const getWindowHeight = () => {
  const doc = document.documentElement;
  return window.innerHeight || doc.clientHeight || document.body.clientHeight;
};

export const getFriendsMoviesIds = (allIds, byId) => {
  let i = 0;
  const totalMax = 50;
  const totalChecks = 200;
  const allFriendMovieIds = [];

  const sliceFriendMovies = (friendId, k) => {
    if (
      byId[friendId] &&
      byId[friendId].movies &&
      byId[friendId].movies.length >= k + 1
    ) {
      let newId = null;
      // slice from the end of the movie arr (most recent first)
      if (k === 0) {
        newId = byId[friendId].movies.slice(-1);
      } else {
        const end = -1 * k;
        const start = end - 1;
        newId = byId[friendId].movies.slice(start, end);
      }

      if (newId && newId[0] && !newId[0].vbf) {
        allFriendMovieIds.push(newId[0].id);
      }
      if (newId && newId[0]) {
        return true;
      }
    }
    return false;
  };

  while (allFriendMovieIds.length <= totalMax || i > totalChecks) {
    let flag = false;

    allIds.forEach(friendId => {
      const res = sliceFriendMovies(friendId, i);
      if (res) {
        flag = true;
      }
    });

    // no more movies remaining
    if (!flag) {
      break;
    }
    i += 1;
  }

  return allFriendMovieIds;
};

export const getFriendsBasicData = (myProfile, allIds, byId) => {
  if (!myProfile) {
    return null;
  }

  const acctFriendsBasic = allIds.reduce((map, friendId) => {
    if (byId[friendId] && byId[friendId].avatar) {
      map[friendId] = {};
      map[friendId].username = byId[friendId].username;
      map[friendId].name = byId[friendId].name;
      map[friendId].avatar = byId[friendId].avatar;
    }
    return map;
  }, {});

  return acctFriendsBasic;
};
