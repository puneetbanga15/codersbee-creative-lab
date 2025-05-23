export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      certificates: {
        Row: {
          content_type: string | null
          file_path: string
          filename: string
          id: string
          milestone_type: Database["public"]["Enums"]["milestone_type"]
          student_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          content_type?: string | null
          file_path: string
          filename: string
          id?: string
          milestone_type: Database["public"]["Enums"]["milestone_type"]
          student_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          content_type?: string | null
          file_path?: string
          filename?: string
          id?: string
          milestone_type?: Database["public"]["Enums"]["milestone_type"]
          student_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      class_attendance: {
        Row: {
          class_schedule_id: string | null
          created_at: string
          homework: string | null
          id: string
          notes: string | null
          status: string | null
          topics_covered: string | null
        }
        Insert: {
          class_schedule_id?: string | null
          created_at?: string
          homework?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          topics_covered?: string | null
        }
        Update: {
          class_schedule_id?: string | null
          created_at?: string
          homework?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          topics_covered?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_attendance_class_schedule_id_fkey"
            columns: ["class_schedule_id"]
            isOneToOne: false
            referencedRelation: "class_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      class_schedules: {
        Row: {
          created_at: string
          duration: unknown | null
          id: string
          recurrence: string | null
          scheduled_at: string
          status: string | null
          student_id: string | null
          teacher_id: string | null
          timezone: string | null
        }
        Insert: {
          created_at?: string
          duration?: unknown | null
          id?: string
          recurrence?: string | null
          scheduled_at: string
          status?: string | null
          student_id?: string | null
          teacher_id?: string | null
          timezone?: string | null
        }
        Update: {
          created_at?: string
          duration?: unknown | null
          id?: string
          recurrence?: string | null
          scheduled_at?: string
          status?: string | null
          student_id?: string | null
          teacher_id?: string | null
          timezone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_schedules_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_schedules_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      communications: {
        Row: {
          created_at: string
          id: string
          message: string
          sender_id: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          sender_id?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          sender_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communications_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          class_frequency: string | null
          course_name: string
          created_at: string
          id: string
          status: string | null
          student_id: string | null
          teacher_id: string | null
        }
        Insert: {
          class_frequency?: string | null
          course_name: string
          created_at?: string
          id?: string
          status?: string | null
          student_id?: string | null
          teacher_id?: string | null
        }
        Update: {
          class_frequency?: string | null
          course_name?: string
          created_at?: string
          id?: string
          status?: string | null
          student_id?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content_type: string | null
          description: string | null
          file_path: string
          filename: string
          id: string
          student_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          content_type?: string | null
          description?: string | null
          file_path: string
          filename: string
          id?: string
          student_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          content_type?: string | null
          description?: string | null
          file_path?: string
          filename?: string
          id?: string
          student_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      emp: {
        Row: {
          Emp_id: number
          Employee_name: string | null
        }
        Insert: {
          Emp_id?: number
          Employee_name?: string | null
        }
        Update: {
          Emp_id?: number
          Employee_name?: string | null
        }
        Relationships: []
      }
      fee_configurations: {
        Row: {
          amount: number
          bank_account_details: string | null
          bank_name: string | null
          classes_prepaid: number | null
          created_at: string
          id: string
          payment_due_days: number | null
          payment_method: string | null
          payment_schedule: string | null
          paypal_email: string | null
          student_id: string | null
        }
        Insert: {
          amount: number
          bank_account_details?: string | null
          bank_name?: string | null
          classes_prepaid?: number | null
          created_at?: string
          id?: string
          payment_due_days?: number | null
          payment_method?: string | null
          payment_schedule?: string | null
          paypal_email?: string | null
          student_id?: string | null
        }
        Update: {
          amount?: number
          bank_account_details?: string | null
          bank_name?: string | null
          classes_prepaid?: number | null
          created_at?: string
          id?: string
          payment_due_days?: number | null
          payment_method?: string | null
          payment_schedule?: string | null
          paypal_email?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_configurations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_management: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string
          id: string
          payment_date: string | null
          status: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date: string
          id?: string
          payment_date?: string | null
          status?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string
          id?: string
          payment_date?: string | null
          status?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_management_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_payments: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          payment_date: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          payment_date?: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          payment_date?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_tracking: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          paid_until_date: string
          payment_mode: string | null
          payment_reference: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          paid_until_date: string
          payment_mode?: string | null
          payment_reference?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          paid_until_date?: string
          payment_mode?: string | null
          payment_reference?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_tracking_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          is_parent: boolean | null
          phone_number: string | null
          preferred_timezone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          is_parent?: boolean | null
          phone_number?: string | null
          preferred_timezone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          is_parent?: boolean | null
          phone_number?: string | null
          preferred_timezone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      progress_milestones: {
        Row: {
          achieved_at: string
          created_at: string
          description: string | null
          id: string
          student_id: string | null
          title: string
        }
        Insert: {
          achieved_at?: string
          created_at?: string
          description?: string | null
          id?: string
          student_id?: string | null
          title: string
        }
        Update: {
          achieved_at?: string
          created_at?: string
          description?: string | null
          id?: string
          student_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_milestones_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_access_codes: {
        Row: {
          access_code: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          quiz_id: string | null
        }
        Insert: {
          access_code: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          quiz_id?: string | null
        }
        Update: {
          access_code?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          quiz_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_access_codes_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string
          explanation: string | null
          id: string
          options: Json
          question: string
          quiz_id: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string
          explanation?: string | null
          id?: string
          options: Json
          question: string
          quiz_id?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string
          explanation?: string | null
          id?: string
          options?: Json
          question?: string
          quiz_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_premium: boolean | null
          quiz_type: Database["public"]["Enums"]["quiz_type"]
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          quiz_type: Database["public"]["Enums"]["quiz_type"]
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          quiz_type?: Database["public"]["Enums"]["quiz_type"]
          title?: string
        }
        Relationships: []
      }
      student_documents: {
        Row: {
          content_type: string | null
          description: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_path: string
          filename: string
          id: string
          student_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          content_type?: string | null
          description?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_path: string
          filename: string
          id?: string
          student_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          content_type?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          file_path?: string
          filename?: string
          id?: string
          student_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_documents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_feedback: {
        Row: {
          created_at: string
          created_by: string | null
          feedback_date: string
          feedback_text: string
          id: string
          student_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          feedback_date?: string
          feedback_text: string
          id?: string
          student_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          feedback_date?: string
          feedback_text?: string
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_feedback_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_feedback_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_journey_milestones: {
        Row: {
          completed_at: string | null
          completion_status: string | null
          created_at: string | null
          id: string
          milestone_type: Database["public"]["Enums"]["milestone_type"]
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          completion_status?: string | null
          created_at?: string | null
          id?: string
          milestone_type: Database["public"]["Enums"]["milestone_type"]
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          completion_status?: string | null
          created_at?: string | null
          id?: string
          milestone_type?: Database["public"]["Enums"]["milestone_type"]
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_journey_milestones_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_projects: {
        Row: {
          created_at: string
          description: string | null
          difficulty_level: string
          id: string
          project_type: string | null
          project_url: string | null
          session_number: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level: string
          id?: string
          project_type?: string | null
          project_url?: string | null
          session_number: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          id?: string
          project_type?: string | null
          project_url?: string | null
          session_number?: number
          title?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string
          full_name: string
          id: string
          parent_id: string | null
          readable_id: string | null
          timezone: string | null
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          parent_id?: string | null
          readable_id?: string | null
          timezone?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          parent_id?: string | null
          readable_id?: string | null
          timezone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trial_bookings: {
        Row: {
          country_code: string | null
          created_at: string
          email: string | null
          grade: number
          has_laptop: boolean
          id: string
          phone_number: string | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          email?: string | null
          grade: number
          has_laptop: boolean
          id?: string
          phone_number?: string | null
        }
        Update: {
          country_code?: string | null
          created_at?: string
          email?: string | null
          grade?: number
          has_laptop?: boolean
          id?: string
          phone_number?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_type:
        | "certificate"
        | "appreciation_letter"
        | "project_details"
        | "other"
      milestone_type:
        | "scratch_fundamentals"
        | "scratch_advanced"
        | "web_fundamentals"
        | "web_advanced"
        | "ai_fundamentals"
        | "ai_master"
      quiz_type: "scratch" | "python" | "ai" | "web" | "cloud"
      user_role: "admin" | "teacher" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: [
        "certificate",
        "appreciation_letter",
        "project_details",
        "other",
      ],
      milestone_type: [
        "scratch_fundamentals",
        "scratch_advanced",
        "web_fundamentals",
        "web_advanced",
        "ai_fundamentals",
        "ai_master",
      ],
      quiz_type: ["scratch", "python", "ai", "web", "cloud"],
      user_role: ["admin", "teacher", "parent"],
    },
  },
} as const
