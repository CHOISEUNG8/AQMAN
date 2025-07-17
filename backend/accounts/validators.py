from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class MaxLengthPasswordValidator:
    def validate(self, password, user=None):
        if len(password) < 4 or len(password) > 20:
            raise ValidationError(
                _("비밀번호는 4자리 이상 20자리 이하여야 합니다."),
                code='password_length_invalid',
            )

    def get_help_text(self):
        return _("비밀번호는 4자리 이상 20자리 이하여야 합니다.") 