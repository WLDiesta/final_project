from rest_framework.throttling import SimpleRateThrottle

class CustomRateThrottle(SimpleRateThrottle):
    scope = 'custom'

    def get_cache_key(self, request, view):
        return self.get_ident(request)