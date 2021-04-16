[![npm](https://img.shields.io/npm/v/@death14stroke/react-native-paged-list.svg?maxAge=2592000)](https://www.npmjs.com/package/@death14stroke/react-native-paged-list)
[![downloads](https://img.shields.io/npm/dt/@death14stroke/react-native-paged-list.svg?maxAge=2592000)](https://www.npmjs.com/package/@death14stroke/react-native-paged-list)
# react-native-paged-list

React Native component to load paged data in list by scrolling infinitely.

## Installation

### npm

```sh
npm install @death14stroke/react-native-paged-list
```

### yarn

```sh
yarn add @death14stroke/react-native-paged-list
```

## Usage

```js
import { PagedList } from "@death14stroke/react-native-paged-list";
...
<PagedList
    firstPage={0}
    loadData={async page => {
        const hasMoreData = getMoreData(page);
        return hasMoreData;
    }}
    data={data}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
/>
...
}
```

## Demo

<img src="output/paged-list.gif" width="250" height="500">

## License

MIT
