# Routes

### 1. pages directory 에 있는 파일 이름으로 주소가 정해진다.

- pages/about.tsx -> /about

- pages/about/index.tsx -> /about

- pages/about/company.tsx -> /about/company

- pages/about/[id].tsx -> /about/:id

- pages/[id]/about.tsx -> /:id/about

- pages/about/[...all].tsx -> /about/\*

<br />

# Data Fetching

### 1. getStaticProps

- 페이지를 렌더링하는 데 필요한 데이터를 사용자 요청에 앞서 빌드 시 사용할 수 있다.
- 데이터는 공개적으로 캐시될 수 있다.
- 페이지 파일에서만 사용할 수 있다.

```ts
import { GetStaticProps } from "next"

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await axios.get(`https://...`)

  if (!data) {
    return {
      notFound: true,
    }
  }

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { data },
    revalidate: 10,
  }
}

/*
  context = {
  params: {
    param: ...
  }
  preview
  previewData
  locale
  locales
  defaultLocale
}
*/
```

```ts
function About({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  //...
}
```

<br />

### 2. getStaticPaths

- 동적 라우팅을 이용해서 페이지를 생성할 경우, getStaticPaths 를 이용해 해당 경로 페이지들을 미리 생성한다.

```ts
import { GetStaticPaths } from 'next'

// about/:id
export const getStaticPaths: GetStaticPaths = async () => {

   const res = await axios.get('https://...')

   const paths = res.map((post) => ({
     params: { id: post.id },
   }))

  return {
    paths,
    fallback: true, false, or 'blocking'

    // false: getStaticPaths 에 없는 경로는 404 page를 반환한다. 미리 렌더링할 페이지가 적거나, 업데이트가 적을 경우에 주로 사용한다.

    // true:  getStaticPaths 에 없는 경로는 설정한 fallback page를 반환한다. 동적 라우팅을 통해 미리 렌더링을 할 페이지가 너무 많거나 데이터에 의존하는 정적 페이지가 많은 경우 사용한다.
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await axios.get(`https://.../${params.id}`)

  return { props: { data } }
}
```

```ts
// 대체 페이지
function About() {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
}
```

<br />

### 3. getServerSideProps

- 빌드와 상관없이, 매 요청마다 데이터를 서버로부터 가져온다.
- 페이지를 렌더링하기전에 꼭 가져와야 하는 데이터가 있을 경우 사용한다.

```ts
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await axios.get(`https://...`)

  if (!data) {
    return {
      notFound: true,
    }
  }

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { data },
  }
}

/*
  context = {
  params
  req
  res
  query
  preview
  previewData
  resolvedUrldata
  locale
  locales
  defaultLocale
}
*/
```

<br />

# 3. Image

```tsx
import Image from "next/image"

function Home() {
  return (
    <>
      <Image src="/..." alt="" width={500} height={500} />
    </>
  )
}

export default Home
```

### 1. layout

- fixed: viewport가 변해도 크기가 변하지 않는다.
- intrinsic: 작은 viewport는 함께 작아지지만, 커지면 기본 값을 유지한다.
- responsive: viewport에 맞게 커지거나 작아진다.
- fill: 부모 요소의 크기에 맞춰 너비와 높이가 늘어난다. object-fit과 함께 사용한다.

### 2. quality

- 최적화된 이미지의 퀄리티.
- 1 ~ 100.
- 기본값은 75

### 3. priority

- true로 할 경우 가져오는데 높은 우선순위를 갖는다.
- 바로 보이는 이미지에만 사용할 것을 권장한다.
