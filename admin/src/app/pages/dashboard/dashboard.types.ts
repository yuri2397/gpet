export interface DashboardTotals {
  courses: number;
  professors: number;
  classes: number;
  salles: number;
  courses_unassigned: number;
  professors_active: number;
  professors_inactive: number;
  pending_payments_amount: number;
  pending_payments_count: number;
}

export interface CourseStatusCount {
  label: string;
  code: string;
  count: number;
}

export interface WeeklyHourPoint {
  date: string;
  hours: number;
}

export interface TopProfessor {
  id: number;
  first_name: string | null;
  last_name: string | null;
  registration_number: string | null;
  hours: number;
  amount: number;
}

export interface TopSalle {
  id: number;
  name: string | null;
  number: number | null;
  usage_count: number;
}

export interface RecentCourse {
  id: number;
  name: string;
  acronym: string;
  classe_id: number;
  professor_id: number | null;
  created_at: string;
}

export interface DashboardData {
  courses: number;
  professors: number;
  classes: number;
  salles: number;
  totals: DashboardTotals;
  courses_by_status: CourseStatusCount[];
  weekly_hours: WeeklyHourPoint[];
  top_professors: TopProfessor[];
  top_salles: TopSalle[];
  salle_occupancy_rate: number;
  recent_courses: RecentCourse[];
}
