export default function(mocks) {
    return ($provide) => {
      for(let prop in mocks) {
        $provide.value(prop, mocks[prop]);
      }
    };
}
