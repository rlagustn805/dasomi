import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_KEY, // API의 기본 URL 설정
    withCredentials: true, // 쿠키를 포함하여 요청
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
        // 요청 시 Authorization 헤더에 토큰 추가
        const accessToken = localStorage.getItem('authToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config; // 변경된 설정 반환
    },
    (error) => {
        // 요청 에러 처리
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => {
        // 성공적인 응답 처리
        return response;
    },
    async (error) => {
        const originalRequest = error.config; // 원래 요청 저장

        if (
            error.response &&
            error.response.status === 403 &&
            !originalRequest._retry
        ) {
            // 토큰 만료 오류(403) 처리
            originalRequest._retry = true; // 재시도 방지 플래그 설정
            try {
                // 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급 요청
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_KEY}/api/users/refresh`,
                    {},
                    { withCredentials: true } // 쿠키 포함 요청
                );
                // 새로 발급받은 액세스 토큰을 로컬 스토리지에 저장
                localStorage.setItem('authToken', data.accessToken);

                // 원래 요청의 Authorization 헤더를 업데이트
                originalRequest.headers[
                    'Authorization'
                ] = `Bearer ${data.accessToken}`;

                // 원래 요청 재요청
                return axios(originalRequest);
            } catch (refreshError) {
                // 리프레시 토큰도 만료되거나 실패한 경우
                localStorage.removeItem('authToken'); // 저장된 토큰 제거

                // alert 메시지 표시
                alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
                location.replace('/login');
                return Promise.reject(refreshError);
            }
        }

        // 다른 오류는 그대로 반환
        return Promise.reject(error);
    }
);
