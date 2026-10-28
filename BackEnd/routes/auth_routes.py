from flask import Blueprint

from controllers.auth_controller import (
    register_user,
    login_user,
    verify_otp,
    resend_otp,
    request_password_reset,
    reset_password,
    change_password,
    logout_user,
    get_current_user,
    get_admin_users,
    get_admin_stats,
    delete_admin_user,
    delete_current_user
)


auth_bp = Blueprint(
    "auth",
    __name__
)


# =========================
# Authentication
# =========================

auth_bp.route(
    "/register",
    methods=["POST"]
)(register_user)


auth_bp.route(
    "/login",
    methods=["POST"]
)(login_user)

auth_bp.route(
    "/verify-otp",
    methods=["POST"]
)(verify_otp)


auth_bp.route(
    "/resend-otp",
    methods=["POST"]
)(resend_otp)


auth_bp.route(
    "/forgot-password",
    methods=["POST"]
)(request_password_reset)

auth_bp.route(
    "/reset-password",
    methods=["POST"]
)(reset_password)

auth_bp.route(
    "/change-password",
    methods=["POST"]
)(change_password)

auth_bp.route(
    "/logout",
    methods=["POST"]
)(logout_user)


auth_bp.route(
    "/me",
    methods=["GET"]
)(get_current_user)


auth_bp.route(
    "/delete-account",
    methods=["DELETE"]
)(delete_current_user)

# =========================
# Admin
# =========================

auth_bp.route(
    "/admin/users",
    methods=["GET"]
)(get_admin_users)


auth_bp.route(
    "/admin/stats",
    methods=["GET"]
)(get_admin_stats)


auth_bp.route(
    "/admin/users/<int:user_id>",
    methods=["DELETE"]
)(delete_admin_user)