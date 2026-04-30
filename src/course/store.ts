const KEY = "sarlaft_user_v1";
const RESPONSES_KEY = "sarlaft_responses_v1";

export type CourseUser = {
  name: string;
  idNumber: string;
  startedAt: string;
};

export function saveUser(u: CourseUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(u));
}

export function getUser(): CourseUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CourseUser) : null;
  } catch {
    return null;
  }
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export type CourseResponse = {
  user: CourseUser;
  answers: Record<string, number>;
  score: number;
  passed: boolean;
  submittedAt: string;
};

export function saveResponse(r: CourseResponse) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RESPONSES_KEY);
    const list: CourseResponse[] = raw ? JSON.parse(raw) : [];
    list.push(r);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(list));
  } catch {
    /* noop */
  }
}