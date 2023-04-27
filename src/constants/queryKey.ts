/**
 * 게시글에 관련된 queryKeys
 *
 * @property allPosts - 모든 게시글 상태를 나타내는 쿼리 키
 * @property post - postId에 해당하는 게시글의 상태를 나타내는 쿼리 키
 * @property likedPosts - 현재 로그인한 사용자가 좋아요한 모든 게시글의 상태를 나타내는 쿼리 키
 * @property postLike - postId에 해당하는 게시글의 좋아요 상태를 나타내는 쿼리 키
 */
const postKeys = {
    /**
     * allPosts: 모든 게시글 상태를 나타내는 쿼리 키
     */
    allPosts: ['posts'] as const,
    /**
     * post: postId에 해당하는 게시글의 상태를 나타내는 쿼리 키
     * @param postId - 조회할 게시글의 ID
     */
    post: (postId: number) => [...postKeys.allPosts, postId] as const,
    /**
     * likedPosts: 현재 로그인한 사용자가 좋아요한 모든 게시글의 상태를 나타내는 쿼리 키
     */
    likedPosts: () => [...postKeys.allPosts, 'liked'] as const,
    /**
     * postLike: postId에 해당하는 게시글의 좋아요 상태를 나타내는 쿼리 키
     * @param postId - 좋아요 상태를 조회할 게시글의 ID
     */
    postLike: (postId: number) => [...postKeys.allPosts, postId, 'like'] as const,
}

/**
 * 인증 관련 queryKeys
 *
 * @property verify - 액세스 토큰을 검증하는 쿼리 키
 * @property refresh: 액세스 토큰을 갱신하는 쿼리 키
 */
const authKeys = {
    /**
     * verify: 액세스 토큰을 검증하는 쿼리 키
     * @param token
     */
    verify: (token: string) => ['auth', 'verify', token] as const,

    /**
     * refresh: 액세스 토큰을 갱신하는 쿼리 키
     * @param token
     */
    refresh: ['auth', 'refresh'] as const,
}

export const queryKeys = {
    post: postKeys,
    auth: authKeys,
}
