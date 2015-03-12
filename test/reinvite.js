require('./includes/common');
describe('reinvite', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    config = {};
    config.domainTo = "domain.to";
    config.domainFrom = "domain.from";
  });

  it('reInvite popup:', function() {
    client = create(config);
    expect(reinviteview.attached).toEqual(false);
  });
  it('reInvite popup after incoming reInvite', function() {
    config.enableAutoAcceptReInvite = false;
    client = create(config);
    testUA.emitReInvite();
    testUA.isVisible(reinviteview.view, true);
  });
  it('reInvite popup after incoming reInvite and accept clicked', function() {
    config.enableAutoAcceptReInvite = false;
    client = create(config);
    testUA.emitReInvite();
    reinviteview.acceptReInviteCall.trigger("click");
    testUA.isVisible(reinviteview.view, false);
    expect(reInviteAccepted).toExist("should have accepted the reInvite")
  });
  it('reInvite popup after incoming reInvite and reject clicked', function() {
    config.enableAutoAcceptReInvite = false;
    client = create(config);
    testUA.emitReInvite();
    reinviteview.rejectReInviteCall.trigger("click");
    testUA.isVisible(reinviteview.view, false);
    expect(reInviteRejected).toExist("should have rejected the reInvite");
  });
});
