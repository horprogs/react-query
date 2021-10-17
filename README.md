![public/docs/logo.svg](public/docs/logo.svg)

# Building the real app with React Query

An example of building the app using React Query.

**Demo:** https://react-query-tutorial.herokuapp.com/

The project is written in TypeScript and uses CRA, React query, axios mock server and material UI for easier prototyping.

## Functionality

- Login using email and password and indicate the logged user
- Show the list of next appointments with load more feature
- Show information about one particular appointment
- Save and view changes history
- Prefetch additional information
- Add and amend required jobs

### Cases covered in the app:

- Deduping multiple requests for the same data into a single request


  ![public/docs/deduping.gif](public/docs/deduping.gif)


- Updating "out of date" data in the background (on window focus)
                                          

  ![public/docs/background_fetching.gif](public/docs/background_fetching.gif)


- Lazy loading list
                    

  ![public/docs/load_more.gif](public/docs/load_more.gif)


- Prefetching the data
                

  ![public/docs/prefetching.gif](public/docs/prefetching.gif)


- Mutations and optimistic changes
             
_Success:_


  ![public/docs/optimistic_changes_success.gif](public/docs/optimistic_changes_success.gif)


_Fail:_

  ![public/docs/optimistic_changes_fail.gif](public/docs/optimistic_changes_fail.gif)


- Suspense and Error Boundaries


![public/docs/suspense.gif](public/docs/suspense.gif)


_The detailed article is coming soon..._
